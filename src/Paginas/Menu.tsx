import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Tree from 'react-d3-tree'
import { ref, set, onValue } from 'firebase/database'
import { AuthContext } from '../Context/Mycontest'
import { realtimeDb } from '../Firebase/config'
import { ArbolNario, type Nodo, type Carpeta } from '../nodos'

type NodoD3 = {
  name: string
  children?: NodoD3[]
}

function Menu() {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState<'carpeta' | 'archivo'>('carpeta')
  const [padreId, setPadreId] = useState('')
  const [resultado, setResultado] = useState('')
  const [arbol, setArbol] = useState<ArbolNario>(new ArbolNario(null))

  if (!authContext) {
    return <p>Cargando contexto...</p>
  }

  const { user, logout } = authContext

  const normalizarNodo = (nodoCrudo: any): Nodo => {
    const hijosCrudos = nodoCrudo?.hijos

    let hijosNormalizados: Nodo[] = []

    if (Array.isArray(hijosCrudos)) {
      hijosNormalizados = hijosCrudos.map(hijo => normalizarNodo(hijo))
    } else if (hijosCrudos && typeof hijosCrudos === 'object') {
      hijosNormalizados = Object.values(hijosCrudos).map(hijo => normalizarNodo(hijo))
    }

    if (nodoCrudo?.tipo === 'archivo') {
      return {
        id: nodoCrudo.id ?? crypto.randomUUID(),
        titulo: nodoCrudo.titulo ?? 'Sin título',
        tipo: 'archivo',
        creadoPor: nodoCrudo.creadoPor ?? '',
        padreId: nodoCrudo.padreId ?? null,
        hijos: []
      }
    }

    return {
      id: nodoCrudo.id ?? crypto.randomUUID(),
      titulo: nodoCrudo.titulo ?? 'Sin título',
      tipo: 'carpeta',
      creadoPor: nodoCrudo.creadoPor ?? '',
      padreId: nodoCrudo.padreId ?? null,
      hijos: hijosNormalizados
    }
  }

  useEffect(() => {
    if (!user?.uid) return

    const referenciaArbol = ref(realtimeDb, `arboles/${user.uid}`)

    const unsubscribe = onValue(referenciaArbol, snapshot => {
      try {
        const data = snapshot.val()

        if (data && data.raiz) {
          const raizNormalizada = normalizarNodo(data.raiz)
          setArbol(new ArbolNario(raizNormalizada))
        } else {
          setArbol(new ArbolNario(null))
        }
      } catch (error) {
        console.error('Error leyendo el árbol:', error)
        setResultado('Error leyendo datos guardados')
        setArbol(new ArbolNario(null))
      }
    })

    return () => unsubscribe()
  }, [user?.uid])

  const guardarArbol = async (raizActual: Nodo | null) => {
    if (!user?.uid) return

    const referenciaArbol = ref(realtimeDb, `arboles/${user.uid}`)

    await set(referenciaArbol, {
      uid: user.uid,
      correo: user.email ?? '',
      raiz: raizActual
    })
  }

  const refrescarArbol = async (raizActual: Nodo | null) => {
    const nuevoArbol = new ArbolNario(raizActual)
    setArbol(nuevoArbol)
    await guardarArbol(raizActual)
  }

  const obtenerCarpetas = (nodo: Nodo | null): Carpeta[] => {
    if (!nodo) return []

    if (nodo.tipo === 'archivo') {
      return []
    }

    let carpetas: Carpeta[] = [nodo]

    for (const hijo of nodo.hijos ?? []) {
      carpetas = [...carpetas, ...obtenerCarpetas(hijo)]
    }

    return carpetas
  }

  const convertirAD3 = (nodo: Nodo): NodoD3 => {
    if (nodo.tipo === 'archivo') {
      return {
        name: nodo.titulo
      }
    }

    return {
      name: nodo.titulo,
      children: (nodo.hijos ?? []).map(hijo => convertirAD3(hijo))
    }
  }

  const handleAgregar = async () => {
    if (!user?.email || !user?.uid) {
      setResultado('Debes iniciar sesión para crear archivos o carpetas')
      return
    }

    if (!nombre.trim()) {
      setResultado('Escribe un nombre')
      return
    }

    try {
      const nuevoNodo: Nodo =
        tipo === 'archivo'
          ? {
              id: crypto.randomUUID(),
              titulo: nombre.trim(),
              tipo: 'archivo',
              creadoPor: user.email,
              padreId: padreId === '' ? null : padreId,
              hijos: []
            }
          : {
              id: crypto.randomUUID(),
              titulo: nombre.trim(),
              tipo: 'carpeta',
              creadoPor: user.email,
              padreId: padreId === '' ? null : padreId,
              hijos: []
            }

      if (!arbol.raiz) {
        if (tipo === 'archivo') {
          setResultado('La raíz inicial debe ser una carpeta')
          return
        }

        await refrescarArbol(nuevoNodo)
        setResultado(`Se creó la carpeta raíz "${nombre.trim()}"`)
      } else {
        arbol.agregarNodo(padreId === '' ? null : padreId, nuevoNodo)
        await refrescarArbol(arbol.raiz)
        setResultado(`Se agregó "${nombre.trim()}" correctamente`)
      }

      setNombre('')
      setTipo('carpeta')
      setPadreId('')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResultado(error.message)
      } else {
        setResultado('Ocurrió un error')
      }
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const carpetasDisponibles = obtenerCarpetas(arbol.raiz)

  return (
    <div className="page">
      <div className="card">
        <h1>Administrador de archivos y carpetas</h1>
        <p>Usuario: {user?.email ?? 'No disponible'}</p>

        <div className="form-box">
          <h3>Crear archivo o carpeta</h3>

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />

          <select
            value={tipo}
            onChange={e => setTipo(e.target.value as 'carpeta' | 'archivo')}
          >
            <option value="carpeta">Carpeta</option>
            <option value="archivo">Archivo</option>
          </select>

          <select
            value={padreId}
            onChange={e => setPadreId(e.target.value)}
          >
            <option value="">Raíz</option>
            {carpetasDisponibles.map(carpeta => (
              <option key={carpeta.id} value={carpeta.id}>
                {carpeta.titulo}
              </option>
            ))}
          </select>

          <button onClick={handleAgregar}>Agregar</button>
        </div>

        <div className="result-box">
          <h3>Resultado</h3>
          <p>{resultado}</p>
        </div>

        <div className="tree-box">
          <h3>Estructura visual</h3>

          {arbol.raiz ? (
            <div className="tree-wrapper">
              <Tree
                data={convertirAD3(arbol.raiz)}
                orientation="vertical"
                translate={{ x: 520, y: 90 }}
                nodeSize={{ x: 240, y: 150 }}
                separation={{ siblings: 1.8, nonSiblings: 2 }}
                pathFunc="step"
                collapsible={false}
                zoomable
              />
            </div>
          ) : (
            <p>No hay elementos creados todavía</p>
          )}
        </div>

        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  )
}

export default Menu
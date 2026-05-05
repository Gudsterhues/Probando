import { type FormEvent, useState } from "react";
import "./App.css";

interface Product {
  name: string;
  popularity: number;
}

class TrieNode {
  value: string;
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  product: Product | null;

  constructor(value: string) {
    this.value = value;
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
    this.product = null;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode("");
  }

  insert(name: string, popularity: number): void {
    let currentNode: TrieNode = this.root;
    const letters: string[] = name.toLowerCase().split("");

    for (const letter of letters) {
      if (!currentNode.children.has(letter)) {
        currentNode.children.set(letter, new TrieNode(letter));
      }

      const nextNode: TrieNode | undefined = currentNode.children.get(letter);

      if (nextNode !== undefined) {
        currentNode = nextNode;
      }
    }

    currentNode.isEndOfWord = true;
    currentNode.product = {
      name,
      popularity,
    };
  }

  searchByPrefix(prefix: string): Product[] {
    let currentNode: TrieNode = this.root;
    const letters: string[] = prefix.toLowerCase().split("");

    for (const letter of letters) {
      const nextNode: TrieNode | undefined = currentNode.children.get(letter);

      if (nextNode === undefined) {
        return [];
      }

      currentNode = nextNode;
    }

    const products: Product[] = [];
    this.collectProducts(currentNode, products);

    return products;
  }

  private collectProducts(node: TrieNode, products: Product[]): void {
    if (node.isEndOfWord && node.product !== null) {
      products.push(node.product);
    }

    for (const child of node.children.values()) {
      this.collectProducts(child, products);
    }
  }
}

class MaxHeap {
  private heap: Product[];

  constructor() {
    this.heap = [];
  }

  push(product: Product): void {
    this.heap.push(product);
    this.percolateUp(this.heap.length - 1);
  }

  pop(): Product | null {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      const product: Product | undefined = this.heap.pop();
      return product === undefined ? null : product;
    }

    const topProduct: Product = this.heap[0];
    const lastProduct: Product | undefined = this.heap.pop();

    if (lastProduct !== undefined) {
      this.heap[0] = lastProduct;
      this.percolateDown(0);
    }

    return topProduct;
  }

  peek(): Product | null {
    if (this.heap.length === 0) {
      return null;
    }

    return this.heap[0];
  }

  heapify(products: Product[]): void {
    this.heap = [...products];

    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.percolateDown(i);
    }
  }

  private percolateDown(index: number): void {
    let currentIndex: number = index;

    while (true) {
      const leftIndex: number = currentIndex * 2 + 1;
      const rightIndex: number = currentIndex * 2 + 2;
      let biggestIndex: number = currentIndex;

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex].popularity > this.heap[biggestIndex].popularity
      ) {
        biggestIndex = leftIndex;
      }

      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex].popularity > this.heap[biggestIndex].popularity
      ) {
        biggestIndex = rightIndex;
      }

      if (biggestIndex === currentIndex) {
        break;
      }

      this.swap(currentIndex, biggestIndex);
      currentIndex = biggestIndex;
    }
  }

  private percolateUp(index: number): void {
    let currentIndex: number = index;

    while (currentIndex > 0) {
      const parentIndex: number = Math.floor((currentIndex - 1) / 2);

      if (
        this.heap[parentIndex].popularity >=
        this.heap[currentIndex].popularity
      ) {
        break;
      }

      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  private swap(indexA: number, indexB: number): void {
    const temp: Product = this.heap[indexA];
    this.heap[indexA] = this.heap[indexB];
    this.heap[indexB] = temp;
  }

  size(): number {
    return this.heap.length;
  }

  toArray(): Product[] {
    return [...this.heap];
  }
}

class SmartSearchEngine {
  private trie: Trie;

  constructor() {
    this.trie = new Trie();
  }

  insert(name: string, popularity: number): void {
    this.trie.insert(name, popularity);
  }

  searchTopK(prefix: string, k: number): Product[] {
    const products: Product[] = this.trie.searchByPrefix(prefix);

    const heap: MaxHeap = new MaxHeap();
    heap.heapify(products);

    const result: Product[] = [];

    while (heap.size() > 0 && result.length < k) {
      const product: Product | null = heap.pop();

      if (product !== null) {
        result.push(product);
      }
    }

    return result;
  }
}

function App() {
  const [products, setProducts] = useState<Product[]>([
    { name: "air max", popularity: 90 },
    { name: "air force", popularity: 95 },
    { name: "air jordan", popularity: 85 },
    { name: "adidas boost", popularity: 80 },
    { name: "air zoom", popularity: 88 },
    { name: "air trainer", popularity: 70 },
    { name: "adidas samba", popularity: 91 },
    { name: "adidas campus", popularity: 84 },
    { name: "nike dunk", popularity: 94 },
    { name: "nike pegasus", popularity: 89 },
  ]);

  const [productName, setProductName] = useState<string>("");
  const [productPopularity, setProductPopularity] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("air");
  const [topK, setTopK] = useState<number>(2);
  const [message, setMessage] = useState<string>("");

  const searchEngine: SmartSearchEngine = new SmartSearchEngine();

  products.forEach((product: Product) => {
    searchEngine.insert(product.name, product.popularity);
  });

  const results: Product[] = searchEngine.searchTopK(prefix, topK);

  const handleInsert = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const cleanName: string = productName.trim().toLowerCase();
    const popularityNumber: number = Number(productPopularity);

    if (cleanName === "") {
      setMessage("Write a product name.");
      return;
    }

    if (popularityNumber <= 0 || popularityNumber > 100) {
      setMessage("Popularity must be between 1 and 100.");
      return;
    }

    const newProduct: Product = {
      name: cleanName,
      popularity: popularityNumber,
    };

    setProducts([...products, newProduct]);
    setProductName("");
    setProductPopularity("");
    setMessage("Product inserted successfully.");
  };

  return (
    <main className="app">
      <section className="hero">
        <p className="tag">Trie + Heap</p>
        <h1>Challenge 11</h1>
        <h2>Smart Search Engine + Top Results</h2>
      </section>

      <section className="content">
        <form className="card" onSubmit={handleInsert}>
          <h3>Insert product</h3>

          <label>Product name</label>
          <input
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            placeholder="Example: air max"
          />

          <label>Popularity</label>
          <input
            type="number"
            value={productPopularity}
            onChange={(event) => setProductPopularity(event.target.value)}
            placeholder="Example: 95"
            min="1"
            max="100"
          />

          <button type="submit">Insert</button>

          {message !== "" && <p className="message">{message}</p>}
        </form>

        <section className="card">
          <h3>Search products</h3>

          <label>Search by prefix</label>
          <input
            type="text"
            value={prefix}
            onChange={(event) => setPrefix(event.target.value)}
            placeholder="Example: air"
          />

          <label>Top K</label>
          <input
            type="number"
            value={topK}
            onChange={(event) => setTopK(Number(event.target.value))}
            min="1"
          />

          <div className="search-info">
            <p>
              Prefix: <strong>{prefix}</strong>
            </p>
            <p>
              Top K: <strong>{topK}</strong>
            </p>
          </div>
        </section>
      </section>

      <section className="results-section">
        <h3>Top results</h3>

        <div className="results">
          {results.length > 0 ? (
            results.map((product: Product) => (
              <article className="product-card" key={product.name}>
                <h4>{product.name}</h4>
                <p>Popularity: {product.popularity}</p>
              </article>
            ))
          ) : (
            <p className="empty">No products found.</p>
          )}
        </div>
      </section>

      <section className="all-products">
        <h3>Saved products in Trie</h3>

        <div className="products-list">
          {products.map((product: Product) => (
            <span key={`${product.name}-${product.popularity}`}>
              {product.name} - {product.popularity}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
import {
  Suspense,
  useDeferredValue,
  useId,
  useInsertionEffect,
  useState,
  useSyncExternalStore,
} from 'react';

function Hooks() {
  // 1. useId
  const randomId = useId();
  console.log(`randomId = `, randomId);

  // 2. useDeferredValue
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // 3. useInsertionEffect
  useInsertionEffect(
    () => {
      const style = document.createElement('style');
      style.textContent = `
      #root {
        margin-top: 2rem;
      }
    `;
      document.head.appendChild(style);
    },
    [
      /* dependency array */
    ]
  );

  // 4. useSyncExternalStore
  // Example external store (could be a browser API, library, or custom store)
  const myStore = {
    state: { count: 1 },
    subscribe: (callback: () => void): (() => void) => {
      console.log(`Store Subscribed`);
      return callback;
    },
    getSnapshot: () => {
      return myStore.state;
    },
  };
  const storeData = useSyncExternalStore(
    myStore.subscribe,
    myStore.getSnapshot
  );

  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
      <br />
      useSyncExternalStore count - {storeData.count}
      <br />
    </>
  );
}

const SearchResults = ({ query }: { query: string }) => {
  return <div>Query: {query}</div>;
};

export default Hooks;

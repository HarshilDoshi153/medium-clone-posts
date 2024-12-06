import { useState, useEffect } from "react";
import { collection, doc, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Adjust your Firebase configuration import as needed

const useFetch = (collectionName, userId, nestedCollectionName) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      let ref;

      if (userId && nestedCollectionName) {
        // Reference to the nested collection inside a specific user's document
        ref = collection(db, `${collectionName}/${userId}/${nestedCollectionName}`);
      } else {
        // Reference to the main collection
        ref = collection(db, collectionName);
      }

      const q = query(ref);

      onSnapshot(q, (snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setLoading(false);
      });
    };

    fetchData();
  }, [collectionName, userId, nestedCollectionName]);

  return {
    data,
    loading,
  };
};

export default useFetch;

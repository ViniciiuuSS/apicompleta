// Define MongoDB document interface
interface MongoDocument {
  _id?: string;
  [key: string]: string | number | boolean | Date | null | undefined;
}

// Define MongoDB filter interface
interface MongoFilter {
  [key: string]: string | number | boolean | Date | null | { $oid: string } | { $set: Record<string, unknown> } | undefined;
}

// Define MongoDB update interface
interface MongoUpdate {
  [key: string]: string | number | boolean | Date | null | undefined;
}

// Define MongoDB response interfaces
interface MongoInsertResponse {
  insertedId: string;
}

interface MongoUpdateResponse {
  matchedCount: number;
  modifiedCount: number;
}

interface MongoDeleteResponse {
  deletedCount: number;
}

if (!process.env.MONGODB_API_KEY) {
  throw new Error("Please define the MONGODB_API_KEY environment variable inside .env");
}

if (!process.env.MONGODB_CLUSTER_URL) {
  throw new Error("Please define the MONGODB_CLUSTER_URL environment variable inside .env");
}

const MONGODB_API_KEY = process.env.MONGODB_API_KEY;
const MONGODB_CLUSTER_URL = process.env.MONGODB_CLUSTER_URL;

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Request-Headers": "*",
  "api-key": MONGODB_API_KEY,
};

export async function findDocuments(database: string, collection: string, filter: MongoFilter = {}) {
  const url = `${MONGODB_CLUSTER_URL}/action/find`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dataSource: "Cluster0",
      database,
      collection,
      filter,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.documents;
}

export async function insertDocument(database: string, collection: string, document: MongoDocument): Promise<MongoInsertResponse> {
  const url = `${MONGODB_CLUSTER_URL}/action/insertOne`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dataSource: "Cluster0",
      database,
      collection,
      document,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function updateDocument(database: string, collection: string, filter: MongoFilter, update: MongoUpdate): Promise<MongoUpdateResponse> {
  const url = `${MONGODB_CLUSTER_URL}/action/updateOne`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dataSource: "Cluster0",
      database,
      collection,
      filter,
      update: { $set: update },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function deleteDocument(database: string, collection: string, filter: MongoFilter): Promise<MongoDeleteResponse> {
  const url = `${MONGODB_CLUSTER_URL}/action/deleteOne`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dataSource: "Cluster0",
      database,
      collection,
      filter,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

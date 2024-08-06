import ProductSearchParameters from '#src/types/types';

// Extend Express Request object type with search parameters

declare global {
  namespace Express {
    export interface Request {
      searchParameters: ProductSearchParameters;
    }
  }
}

export {};

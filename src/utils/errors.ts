import { FirestoreError } from 'firebase/firestore';

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly operation: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleFirestoreError = (error: unknown, operation: string): never => {
  console.error(`Operation failed: ${operation}`, error);
  
  if (error instanceof FirestoreError) {
    throw new AppError(
      `Failed to ${operation}: ${error.message}`,
      error.code,
      operation
    );
  }
  
  throw new AppError(
    `Failed to ${operation}: Unknown error occurred`,
    'unknown',
    operation
  );
};
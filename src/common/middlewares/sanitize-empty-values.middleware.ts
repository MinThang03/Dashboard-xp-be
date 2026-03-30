import { NextFunction, Request, Response } from 'express';

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false;
  return Object.getPrototypeOf(value) === Object.prototype;
};

const isIdentifierKey = (key: string): boolean => {
  return /^Ma[A-Z]/.test(key) || key.endsWith('Id') || key.endsWith('ID');
};

const sanitizeValue = (value: unknown, key?: string): unknown => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      // Use null for blank values to avoid invalid syntax errors on date/number columns.
      return null;
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (isPlainObject(value)) {
    const output: Record<string, unknown> = {};
    for (const [childKey, childValue] of Object.entries(value)) {
      const sanitizedChild = sanitizeValue(childValue, childKey);

      // Drop blank identifier fields so TypeORM does not interpret empty PK as an existing row.
      if (sanitizedChild === null && isIdentifierKey(childKey)) {
        continue;
      }

      output[childKey] = sanitizedChild;
    }
    return output;
  }

  if (value === undefined && key && isIdentifierKey(key)) {
    return undefined;
  }

  return value;
};

export const sanitizeEmptyValuesMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  req.body = sanitizeValue(req.body) as Record<string, unknown>;
  next();
};

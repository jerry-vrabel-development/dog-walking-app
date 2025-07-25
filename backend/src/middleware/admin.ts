import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@dog-walking-app/shared';

// Middleware to check if user is admin
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    } as ApiResponse<null>);
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Admin access required'
    } as ApiResponse<null>);
  }

  next();
};

// Middleware to check if user is admin or accessing their own data
export const requireAdminOrSelf = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    } as ApiResponse<null>);
  }

  const targetUserId = req.params.id;
  const isAdmin = req.user.role === 'admin';
  const isSelf = req.user._id.toString() === targetUserId;

  if (!isAdmin && !isSelf) {
    return res.status(403).json({
      success: false,
      error: 'Access denied'
    } as ApiResponse<null>);
  }

  next();
};

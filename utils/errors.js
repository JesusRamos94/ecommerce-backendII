export class NotFoundError extends Error { constructor(msg='Not Found'){ super(msg); this.status=404; } }
export class BadRequestError extends Error { constructor(msg='Bad Request'){ super(msg); this.status=400; } }
export class UnauthorizedError extends Error { constructor(msg='Unauthorized'){ super(msg); this.status=401; } }
export class ForbiddenError extends Error { constructor(msg='Forbidden'){ super(msg); this.status=403; } }

export class ApiError extends Error {
  title: string;
  description: string;
  code: number;

  constructor(title: string, description?: string, code?: number) {
    super(title);
    this.title = title;
    this.description = description;
    this.code = code;
  }
}

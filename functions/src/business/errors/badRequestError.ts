import { BaseError } from "./baseError";

export class BadRequestError extends BaseError {
  constructor( message: string ) {
    super( 400, message );
  }
}

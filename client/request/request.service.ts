import axios from 'axios';

import { ParserService } from '../parser/parser.service.js';

export class RequestService {
  constructor(private readonly $args: ParserService) {}
  async request() {
    try {
      const { status, data, headers } = await axios.request({
        url: this.$args.url,
        method: this.$args.method,
        ...(this.$args.data && {
          data: this.$args.data,
        }),
        ...(this.$args.headers && {
          headers: this.$args.headers,
        }),
        ...(this.$args.username && {
          auth: {
            password: this.$args.password,
            username: this.$args.username,
          },
        }),
      });

      console.log({ status, data, headers });
    } catch (e) {
      console.error(e.message);
      console.error(e.response?.data);
      console.error(e.request?._options);
    }
  }
}

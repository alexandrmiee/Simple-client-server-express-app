import { Argv } from 'yargs';

export class ParserService {
  // TODO: types
  args: any;

  constructor(private readonly $parser: Argv<{}>) {
    this.parse($parser);
  }

  private parse($parser: Argv<{}>) {
    this.args = $parser
      .option({
        user: {
          alias: 'u',
          describe: 'provide user credentials -u "login:password"',
          demandOption: false,
        },
        request: {
          alias: 'X',
          describe: 'request method, GET by default',
          demandOption: false,
          default: 'GET',
        },
        header: {
          alias: 'H',
          describe:
            'provide headers -H "Authorization: Basic bG9naW46cGFzc3dvcmQ" -H "Cache-Control: must-revalidate" -H "Pragma: no-cache"',
          demandOption: false,
        },
        data: {
          alias: 'd',
          describe: 'json data',
          demandOption: false,
        },
      })
      .array('header')
      .parse();
  }

  get username() {
    const [username] = this.args.user?.split(':') || [];
    return username;
  }

  get password() {
    const [_, password] = this.args.user?.split(':') || [];
    return password;
  }

  get url() {
    return this.args._.find((item: string) => item.includes('http'));
  }

  get method() {
    return this.args.request;
  }

  get data() {
    return this.args.data && JSON.parse(this.args.data.replaceAll('\\n', ''));
  }

  get headers() {
    return (
      this.args.header &&
      this.args.header.reduce((result: Record<string, string>, header: string) => {
        const [key, value] = header.split(':');
        return { ...result, [key]: value };
      }, {})
    );
  }
}

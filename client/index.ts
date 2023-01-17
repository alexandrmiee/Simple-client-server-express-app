import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { ParserService } from './parser/parser.service.js';
import { RequestService } from './request/request.service.js';

const parserService = new ParserService(yargs(hideBin(process.argv)));
const requestService = new RequestService(parserService);

requestService.request();

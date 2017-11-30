import 'babel-polyfill';
import 'nprogress/nprogress.css';
import san from 'san';

import data from '../lib/utils/data.js';

const router = require('{{ routesPath }}')(data);
const root = '{{ root }}';

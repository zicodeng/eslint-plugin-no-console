/**
 * @fileoverview Disallow any console statement.
 * @author Zico Deng
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-console');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const error = {
  message: 'Using console is not allowed',
  type: 'Identifier',
  ruleId: 'no-console',
};

ruleTester.run('no-console', rule, {
  valid: [
    // give me some code that won't trigger a warning
    'foo.console();',
    'console();',
    'console.baz();',
  ],

  invalid: [
    {
      code: "console.log('Hello, World!');",
      errors: [error],
    },
    {
      code: "console.info('Hello, World!');",
      errors: [error],
    },
    {
      code: "console.warn('Hello, World!');",
      errors: [error],
    },
  ],
});

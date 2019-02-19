/**
 * @fileoverview Disallow any console statement.
 * @author Zico Deng
 */
'use strict';

const objectLooksLike = require('object-looks-like');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow any console statement.',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function(context) {
    const disallowedMethods = ['log', 'info', 'warn'];

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    return {
      Identifier(node) {
        const isConsoleCall = objectLooksLike(node, {
          name: 'console',
          parent: {
            type: 'MemberExpression',
            property: {
              name: val => disallowedMethods.includes(val),
            },
          },
        });
        if (!isConsoleCall) {
          return;
        }
        context.report({
          node,
          message: 'Using console is not allowed',
        });
      },
    };
  },
};

/**
 * @fileoverview Disallow any console statement.
 * @author Zico Deng
 */
'use strict';

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
    const isPrimitive = val => {
      return val == null || /^[sbn]/.test(typeof val);
    };

    const looksLike = (a, b) => {
      return (
        a &&
        b &&
        Object.keys(b).every(bKey => {
          const bVal = b[bKey];
          const aVal = a[bKey];
          if (typeof bVal === 'function') {
            return bVal(aVal);
          }
          return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
        })
      );
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    return {
      Identifier(node) {
        const isConsoleCall = looksLike(node, {
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

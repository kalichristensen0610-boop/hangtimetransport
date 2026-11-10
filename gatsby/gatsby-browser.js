const React = require('react');
const { Frame } = require('../app/move-site');
require('../app/styles.css');
exports.wrapPageElement = ({ element }) => React.createElement(Frame, null, element);

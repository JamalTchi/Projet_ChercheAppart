'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reactNative = require('react-native');

var variantClasses = {
  primary: 'bg-primary',
  secondary: 'bg-white border border-primary'
};

var textVariantClasses = {
  primary: 'text-white',
  secondary: 'text-primary'
};

var Button = function Button(_ref) {
  var label = _ref.label;
  var onPress = _ref.onPress;
  var _ref$variant = _ref.variant;
  var variant = _ref$variant === undefined ? 'primary' : _ref$variant;
  var _ref$disabled = _ref.disabled;
  var disabled = _ref$disabled === undefined ? false : _ref$disabled;
  var _ref$fullWidth = _ref.fullWidth;
  var fullWidth = _ref$fullWidth === undefined ? true : _ref$fullWidth;
  var _ref$className = _ref.className;
  var className = _ref$className === undefined ? '' : _ref$className;

  return React.createElement(
    _reactNative.Pressable,
    {
      onPress: onPress,
      disabled: disabled,
      className: (fullWidth ? 'w-full' : '') + ' rounded-full py-3.5 px-4 items-center justify-center ' + variantClasses[variant] + ' ' + (disabled ? 'opacity-60' : '') + ' ' + className,
      accessibilityRole: 'button'
    },
    React.createElement(
      _reactNative.Text,
      { className: 'text-base font-semibold ' + textVariantClasses[variant] },
      label
    )
  );
};
exports.Button = Button;

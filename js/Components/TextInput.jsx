import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                ' focus:border-indigo-500 focus:ring-indigo-500 rounded-md ' +
                className
            }
            style={{ border: 'none' }}
            ref={input}
        />
    );
});

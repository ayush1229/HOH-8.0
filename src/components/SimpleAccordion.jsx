import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const AccordionContext = createContext(null);

export function Accordion({ children, defaultValue = null, allowMultiple = false }) {
  const [openValues, setOpenValues] = useState(() => {
    if (allowMultiple) return new Set(Array.isArray(defaultValue) ? defaultValue : []);
    return defaultValue ?? null;
  });

  const toggle = useCallback(
    value => {
      if (allowMultiple) {
        setOpenValues(prev => {
          const next = new Set(prev instanceof Set ? prev : new Set());
          if (next.has(value)) next.delete(value);
          else next.add(value);
          return next;
        });
      } else {
        setOpenValues(prev => (prev === value ? null : value));
      }
    },
    [allowMultiple]
  );

  const context = { openValues, toggle, allowMultiple };

  return <AccordionContext.Provider value={context}>{children}</AccordionContext.Provider>;
}

export function AccordionItem({ children, value }) {
  return (
    <div className="w-full max-w-full">{React.Children.map(children, child => React.cloneElement(child, { itemValue: value }))}</div>
  );
}

export function AccordionTrigger({ children, itemValue }) {
  const ctx = useContext(AccordionContext);
  const isOpen = ctx?.allowMultiple ? ctx.openValues.has(itemValue) : ctx.openValues === itemValue;

  return (
    <button
      type="button"
      onClick={() => ctx.toggle(itemValue)}
      className="w-full text-left px-6 py-4 border-b border-black/10 bg-black/5 hover:bg-black/10 transition"
      aria-expanded={!!isOpen}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-black">{children}</div>
        <div className="text-black/60">{isOpen ? '−' : '+'}</div>
      </div>
    </button>
  );
}

export function AccordionPanel({ children, itemValue }) {
  const ctx = useContext(AccordionContext);
  const isOpen = ctx?.allowMultiple ? ctx.openValues.has(itemValue) : ctx.openValues === itemValue;
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isOpen) {
      const h = el.scrollHeight;
      setHeight(h);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={{ maxHeight: isOpen ? height : 0, transition: 'max-height 300ms ease', overflow: 'hidden' }}
      className="px-6 text-black/85 bg-black/[0.02]"
    >
      <div className="py-4">{children}</div>
    </div>
  );
}

export default Accordion;

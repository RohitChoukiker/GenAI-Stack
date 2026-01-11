import { createContext, useContext, useState, useEffect } from "react";

const StackContext = createContext();

export function StackProvider({ children }) {
  const [stacks, setStacks] = useState([]);
  const [currentStack, setCurrentStack] = useState(null);

 
  const loadStack = (stackId) => {
    const stack = stacks.find((s) => s.id === parseInt(stackId));
    if (stack) {
      setCurrentStack(stack);
    }
  };


  const createStack = (stackData) => {
    const newStack = {
      id: stacks.length + 1,
      ...stackData,
    };
    setStacks((prev) => [...prev, newStack]);
    return newStack;
  };

 
  const updateStack = (stackId, stackData) => {
    setStacks((prev) =>
      prev.map((stack) =>
        stack.id === parseInt(stackId) ? { ...stack, ...stackData } : stack
      )
    );
    if (currentStack && currentStack.id === parseInt(stackId)) {
      setCurrentStack({ ...currentStack, ...stackData });
    }
  };

  
  const deleteStack = (stackId) => {
    setStacks((prev) => prev.filter((stack) => stack.id !== parseInt(stackId)));
    if (currentStack && currentStack.id === parseInt(stackId)) {
      setCurrentStack(null);
    }
  };

  const value = {
    stacks,
    currentStack,
    loadStack,
    createStack,
    updateStack,
    deleteStack,
    setStacks,
  };

  return <StackContext.Provider value={value}>{children}</StackContext.Provider>;
}

export function useStack() {
  const context = useContext(StackContext);
  if (!context) {
    throw new Error("useStack must be used within a StackProvider");
  }
  return context;
}


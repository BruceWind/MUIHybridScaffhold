// this class is supposed to declare some variables of window, 
// this could make every js file can use the variable of window.

export {};

declare global {
  interface Window {
    hybridge: any;
  }
}
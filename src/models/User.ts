interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void; // Alias for a function that takes nothing as params and returns nothing

export class User {
  events: { [key: string]: Callback[] } = {};
  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(updateProp: UserProps): void {
    Object.assign(this.data, updateProp); // Object.assign will copy props from updateProp to this.data
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => {
      callback();
    });
  }
}

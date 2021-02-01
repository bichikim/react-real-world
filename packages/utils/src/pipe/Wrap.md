# Wrap for Pipe & Async Pipe

## Example

Validator
```typescript
import {createPipe, deliverArgWrap} from './index'
const countPipe = (value: string) => (value.length < 4)
const startPipe = (value: string) => (value.startsWith('f'))
const pipe = createPipe(deliverArgWrap)
const result = pipe(countPipe, startPipe)('foo') // true
const result1 = pipe(countPipe, startPipe)('bar') // false
console.log(result)
console.log(result1)
`````

Async validator
```typescript
import {createAsyncPipe, deliverArgWrap} from './index'
const countPipe = (value: string) => (value.length < 4)
const asyncStartPipe = (value: string) => (Promise.resolve(value.startsWith('f')))
const pipe = createAsyncPipe(deliverArgWrap)
const result = await pipe(countPipe, asyncStartPipe)('foo') // true
const result1 = await pipe(countPipe, asyncStartPipe)('bar') // false
console.log(result)
console.log(result1)
```

# icon-name-type

CLI to generate TS file with IconName type.


### Intro

Image a React (NextJS) project with following structure.

Icons stored by groups in folders named by icon size.

```
public/
  images/
    icons/
      16/
        chevron.svg
        clockwise.svg
      24/
        arrow-left.svg
        arrow-right.svg  
```

There is an `Icon` component which accepts icon `name` property.

```tsx
type IconName = '16/chevron' | '16/clockwise' | '24/arrow-left' | '24/arrow-right'

type IconProps = {
  name: IconName
}

const Icon: React.FC<IconProps> = ({ name }) => (
  <img src={`/images/svg/${name}`} />
)
```

To automate process and avoid handwriting `IconName` type this package exists.

`icon-name-type` call will generate `icons.d.ts` file with content

```
export type IconName = '16/chevron' | '16/clockwise' | '24/arrow-left' | '24/arrow-right'
```

The `Icon` component's code can be simplified

```tsx
import type { IconType } from './icons'

type IconProps = {
  name: IconName
}

const Icon: React.FC<IconProps> = ({ name }) => (
  <img src={`/images/svg/${name}`} />
)
```


### Generate types 

```
icon-name-type --i ./public/images/svg --o ./src/components/Icon
```


### Watch for input changes and generate types

```
icon-name-type --i .. --o .. --watch
```

### Helpful scripts

Add this to your package.json scripts

```
"build-icons": "icon-name-type --i ./public/images/svg --o ./src/components/ui/Icon",
"watch-icons": "npm run build-icons -- --watch",
```

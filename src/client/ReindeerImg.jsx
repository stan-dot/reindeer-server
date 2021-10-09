import { IMG_DIMENSIONS } from "./Constants"
const varToString = varObj => Object.keys(varObj)[0]

const someVar = 42
const displayName = varToString({ someVar })
console.log(displayName)

export default function ReindeerImg({ name }) {
  const str = varToString(name);
  return <img
    src={name}
    rel={"reindeer-" + str}
    href={"%PUBLIC_URL%/reindeer-" + str + ".jpg"}
    alt={'reindeer ' + str}
    height={IMG_DIMENSIONS.HEIGHT / 3}
    width={IMG_DIMENSIONS.WIDTH / 4}
  />
}
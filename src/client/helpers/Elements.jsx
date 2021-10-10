import { Button } from "@material-ui/core"


export function MyButton({name, callback}) {
  const fullName = name + "Button";
  return <Button
    className={fullName}
    variant="contained"
    id={fullName}
    color="primary"
    component="button"
    onClick={callback}
    disabled={false}>
    {name}
  </Button>
}
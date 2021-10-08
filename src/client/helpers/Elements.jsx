import { Button } from "@material-ui/core"


export function MyButton({name,}) {
  const fullName = name + "Button";
  return <Button
    className={fullName}
    variant="contained"
    id={fullName}
    color="primary"
    component="button"
    onClick={console.log("clicked!")}
    disabled={false}>
    {name}
  </Button>
}
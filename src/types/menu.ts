export type MenuTree = {

}

export type BaseMenu = {
  id: string ;
  pid: string | null;
  url: string;
  component: string,
  order: number;
  depth: number;
  name: string;
  description: string;
}
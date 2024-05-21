import { columns } from "./columns"
import { DataTable } from "./data-table"

interface demoPageProp {
  searchParams: { [key: string]: string }
}

export default async function DemoPage({ searchParams } : demoPageProp) {
  if (Object.keys(searchParams).length === 0) {
    searchParams['skip'] = '0';
    searchParams['limit'] = '20';
  }
  let searchStr = Object.keys(searchParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`).join('&');
  let response = await fetch('https://dummyjson.com/users?'+searchStr);

  let data = await response.json();

  let userData = data.users;

  let total = data.total;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={userData} total={total} />
    </div>
  )
}

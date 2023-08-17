import myRequest from "..";

interface IHomeData {
  data: any,
  returnCode: string,
  success: boolean
}

myRequest.request<IHomeData>({
  url: "/home/multidata"
}).then(res => {
  console.log(res.data, res.returnCode, res.success)
})


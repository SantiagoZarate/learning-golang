import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <section className="grid grid-cols-5 gap-8 w-full items-center">
      <article className="col-span-3">
        <img
          className="w-full h-full object-cover rounded-md"
          src="https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F4e0d816kuzyu700pdbjn.png" alt="" />
      </article>
      <article className="col-span-2 rounded-xl w-full bg-muted shadow-lg flex p-6 flex-col gap-4">
        <Outlet />
      </article>
    </section>
  )
}

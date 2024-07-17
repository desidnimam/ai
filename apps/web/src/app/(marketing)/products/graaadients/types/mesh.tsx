import { Grid5 } from "@/components/common/gallery";
import cloudinary from "@/lib/cloudinary";

export async function Grad1() {
  const data = await cloudinary.v2.search
    .expression(`folder:products/graaadients/grad1/*`)
    .sort_by("created_at", "desc")
    .max_results(400)
    .execute();

  return (
    <main>
      <Grid5 images={data.resources} />
    </main>
  );
}

export async function Grad2() {
  const data = await cloudinary.v2.search
    .expression(`folder:products/graaadients/grad2/*`)
    .sort_by("created_at", "desc")
    .max_results(400)
    .execute();

  return (
    <main>
      <Grid5 images={data.resources} />
    </main>
  );
}

export async function Grad3() {
  const data = await cloudinary.v2.search
    .expression(`folder:products/graaadients/grad3/*`)
    .sort_by("created_at", "desc")
    .max_results(400)
    .execute();

  return (
    <main>
      <Grid5 images={data.resources} />
    </main>
  );
}

export async function Grad4() {
  const data = await cloudinary.v2.search
    .expression(`folder:products/graaadients/grad4/*`)
    .sort_by("created_at", "desc")
    .max_results(400)
    .execute();

  return (
    <main>
      <Grid5 images={data.resources} />
    </main>
  );
}

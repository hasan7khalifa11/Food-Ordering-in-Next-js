import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

type FormDataFile = Blob & {
    name?: string;
};

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as FormDataFile | null;
        const pathName = formData.get("pathName") as string;

        if (!file) {
            return NextResponse.json({ error: " No file provided" }, { status: 400 });
        }

        // Convert the file to a fromat Cloudinary can handle (Buffer to base64)
        const bufferFile = await file.arrayBuffer();
        const base64File = Buffer.from(bufferFile).toString("base64");

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.v2.uploader.upload(
            `data:${file.type};base64,${base64File}`,
            {
                folder: pathName,
                transformation: [
                    { width: 200, height: 200, crop: "fill", gravity: "face" },
                ],
            }
        );

        return NextResponse.json({ url: uploadResponse.secure_url });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        );
    }
}

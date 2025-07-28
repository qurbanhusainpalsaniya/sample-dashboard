import imageCompression from 'browser-image-compression';


export function getFirstCharacter(name) {
    return name && name.trim().charAt(0).toUpperCase();
}


export async function avatarImageCompress(file) {
    if (file) {
        const options = { maxSizeMB: 0.15, maxWidthOrHeight: 720, useWebWorker: true }
        const compressFile = await imageCompression(file, options)
        const createFile = new File([compressFile], compressFile.name.replaceAll(' ', '_'), { type: compressFile.type })
        return createFile ? createFile : null
    }
}

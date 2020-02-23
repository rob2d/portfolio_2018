// simple function to quickly generate
// new rows of images

export default function generateMediaImages(projectId, mediaCount, captions=[]) {
    const mediaImages = [];

    for(let i = 0; i < mediaCount; i++) {
        mediaImages.push({
            type : 'image',
            src : `/img/projects/${projectId}/${projectId}_screen_0${i+1}.png`,
            thumb : `/img/projects/${projectId}/${projectId}_thumb_0${i+1}.png`,
            caption : captions?.[i] || undefined
        });
    }

    return mediaImages;
}

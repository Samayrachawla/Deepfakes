let videoCount = 0;
let videos = [];
const MINIMUM_VIDEOS = 100; // Minimum number of videos needed for analysis

function uploadVideos(type) {
    const input = type === 'deepfake' ? document.getElementById('deepfake-input') : document.getElementById('normal-input');
    const files = input.files;
    if (files.length > 0) {
        for (let file of files) {
            videos.push({ file: file, type: type });
        }
        videoCount += files.length;
        if (videoCount > 100) {
            videoCount = 100;
        }
        document.getElementById('counter').innerText = `Videos Uploaded: ${videoCount}`;
        document.getElementById('message').innerText = 'Thank you for submitting!';
        setTimeout(() => {
            document.getElementById('message').innerText = '';
        }, 3000);

        if (videoCount >= MINIMUM_VIDEOS) {
            document.getElementById('analysis').innerText = 'You can now analyze the videos.';
        } else {
            document.getElementById('analysis').innerText = `Wait until ${MINIMUM_VIDEOS} videos are uploaded.`;
        }
    }
}

function analyzeVideos() {
    const deepfakeVideos = videos.filter(video => video.type === 'deepfake');
    const normalVideos = videos.filter(video => video.type === 'normal');

    const deepfakeCriteria = `
        - Obvious visual artifacts such as blurring, distortions, and unnatural edges.
        - Unnatural movements or expressions that do not match the typical human behavior.
        - Inconsistent lighting and shadows that do not align with the environment.
        - Audio that does not sync well with the lip movements or has unusual patterns.
        - Mismatched facial features or irregularities when compared to the original footage.
    `;
    const normalCriteria = `
        - Natural movements and expressions that are consistent with human behavior.
        - Consistent lighting and shadows that align with the environment.
        - Audio that syncs perfectly with lip movements and has a natural flow.
        - Facial features and expressions that match the original footage without irregularities.
        - No visual artifacts or distortions in the video frames.
    `;

    const analysisResult = {
        deepfakeCount: deepfakeVideos.length,
        normalCount: normalVideos.length,
        deepfakeCriteria: deepfakeCriteria,
        normalCriteria: normalCriteria,
    };

    document.getElementById('analysis').innerHTML = `
        <h2>Analysis Complete:</h2>
        <p>Deepfake Videos: ${analysisResult.deepfakeCount}</p>
        <p>Normal Videos: ${analysisResult.normalCount}</p>
        <h3>Deepfake Criteria:</h3>
        <p>${analysisResult.deepfakeCriteria}</p>
        <h3>Normal Criteria:</h3>
        <p>${analysisResult.normalCriteria}</p>
    `;
}

function checkDeepfakeStatus() {
    if (videoCount < MINIMUM_VIDEOS) {
        document.getElementById('analysis').innerText = `Wait until ${MINIMUM_VIDEOS} videos are uploaded.`;
    } else {
        analyzeVideos();
    }
}

// Redirect to registration page if no deepfake videos are uploaded
function redirectToRegistration() {
    window.location.href = 'https://hoodem.com/register/';
}

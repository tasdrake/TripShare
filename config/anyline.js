
export default {
    license: '',
    options: {
        "captureResolution": "1080p",
        "cutout": {
            "style": "rect",
            "maxWidthPercent": "80%",
            "maxHeightPercent": "80%",
            "alignment": "center",
            "width": 540,
            "ratioFromSize": {
                "width": 4,
                "height": 1
            },
            "strokeWidth": 2,
            "cornerRadius": 10,
            "strokeColor": "FFFFFF",
            "outerColor": "000000",
            "outerAlpha": 0.3
        },
        "flash": {
            "mode": "manual",
            "alignment": "bottom_right"
        },
        "beepOnResult": true,
        "vibrateOnResult": true,
        "blinkAnimationOnResult": true,
        "cancelOnResult": true,
        "visualFeedback": {
            "style": "CONTOUR_RECT",
        }
    },

 ocr: {
       "scanMode": "AUTO",
       "tesseractLanguages": ["anyline_capitals"],
       "charWhitelist": "123456789",
       "validationRegex": "[0-9]{8}$",
       "isBrightTextOnDark": true
   }
 };

[//]: # (Image References)

[image1]: ./images/fjord.jpg "Sample Input Image"
[image2]: ./new-images/fjord-100x100.jpg "Output Image resized to 100x100"

## Project Overview

Welcome to my Storefront Backend API project. 

This project will show how I build an API using Node.js, TypeScript, and Express. The primary purpose of this project resize images upon some input variables and store them locally. In addition, we utilize a caching mechanism to void unnecessary processing.

![Sample Input Image][image1]

This is an image example that processed trough the endpoint, the result was the next image, saved in the new-image folder and now every time the user wants the same image, it will be cache from there.

![Output Image resized to 100x100][image2]

The project has a logger that show all the process being made on the API, it will create a ``image-api.log`` where you can find the process that when throw as well in the terminal.

```
2021-09-21 14:34:26:3426 info: Successfull finding existing file in cache - undefined
2021-09-21 14:34:26:3426 info: File was found in cache - undefined
2021-09-21 14:34:38:3438 error: File not found in cache - Error: ENOENT: no such file or directory, access 'C:\Users\m_cov\Desktop\Udemy-Course\Image-Processing-Project\new-images\undefined-NaNxNaN.jpg'
2021-09-21 14:34:38:3438 warn: File not found, continue with creation - undefined
2021-09-21 14:34:38:3438 info: imageCreation starting - undefined
2021-09-21 14:34:38:3438 error: Error while creating new image - Error: Expected positive integer for width but received NaN of type number
```

## Project Instructions

### Instructions

1. Clone the repository and navigate to the downloaded folder.

```
git clone https://github.com/Flatcova/ImageProcessingAPI-Udacity.git
cd ImageProcessingAPI-Udacity-main
```

2. Intall all both devDependencies, and dependencies from package.json by just writing
```
npm i
```

3. Run the script to compile the /src folder
```
npm run build
```

4. Run the command to initialize the project already compiled inside the /dist folder
```
npm run start
```

5. Open your browser on ``localhost:3000`` and go to the endpoint ``/images`` once there you will see an error displaying missing information

6. Add the parameters for the image that will be processed, they need to be 3 parameters
```
name= //Name of the image without extension
width= //new width size for the image
height= //new height size for the image
```
example: ``localhost:3000/images?name=fjord&width=100&height=100``
(Use images localed on the images folder, you can add new images with .JPG formatting)

7. When trying to resize the same image with the same parameters the image will be cache from the previous created.

### Aditional Scripts

1. Run eslint and prettier, you can use the next scripts to check for any error and clean the code.
```
npm run lint
```
following by
```
npm run prettier
```

2. Testing script will run the ``build`` script first and once created the ``/dist`` folder it would run jasmine for all the Unit test.
```
npm run test
```

3. For running the TypeScript version on src folder, I use ```Nodemon``` to be able to see changes on the server while develop.
```
npm run dev
```
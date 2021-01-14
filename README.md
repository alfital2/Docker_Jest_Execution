# Parallelize_jest_execution

 In this project I integrated and extended a popular test runner in the javascript ecosystem: 
 <a href ="https://github.com/facebook/jest"> jest</a>.

In this project I wanted to simulate a parallel run of tests on a separate server / machine.
To mimick another computer, I used a docker container.
In order to achieve this goal, I override jest's runner class so that no testing would be performed directly on the user's computer, those in the docker's container.
Then, the test is sent to the container, and receives a unique id. This way, after running the test via jest(inside the container), each test result is returned to the process that invoked it on the clients machine.

# Quick start

Install dependencies both in the client and the server:

```
npm install
```

In the server dir, run:
```
docker build -t remote-machine .
```

After the built has complited, run the container :
```
docker run -p 3000:3000 remote-machine  
```

# Startup a local concourse

    vagrant init concourse/lite  # creates ./Vagrantfile
    vagrant up                   # downloads the box and spins up the VM

Should be available at: http://192.168.100.4:8080/

Next, download and install `fly` for your platform

# Fly Commands

    fly -t culture login -c http://192.168.100.4:8080                               # Setup the target
    fly -t culture set-pipeline -p culture-client -c pipeline.yml -l credentials.yml   # Create the pipeline
    fly -t culture unpause-pipeline -p culture-client                                  # Unpause the pipeline

 

import React from 'react'

const Login = () => {
  return (
    <div>Login
      <py-script>
      import time
import psutil
import os

def write_code_to_file(code, filename):
    with open(filename, 'w') as file:
        file.write(code)

def measure_execution_time_and_memory(file_path):
    # Record start time
    start_time = time.time()

    # Execute the Python file
    os.system(f'python {file_path}')

    # Record end time
    end_time = time.time()

    # Calculate execution time
    execution_time = end_time - start_time

    # Get memory usage
    process = psutil.Process(os.getpid())
    memory_usage = process.memory_info().rss / (1024 ** 2)  # Convert to MB

    return execution_time, memory_usage

if __name__ == "__main__":

    code = """
    ### Implementations of pseudocode methods in Python (ignore this part) ###

    from random import randrange

    def display(*args):
        print(*args, sep="")

    def concat(*args):
        result = ""
        for x in args:
            result += str(x)
        return result

    def charat(s, i):
        return s[i]

    def substr(s, a, b):
        return s[a:(b+1)]

    def random(a, b):
        return randrange(a, b + 1)

    print(f"[1m(Remember to re-run 'pseudo.py' if you edit the source pseudocode!)[0m")

    ### Your converted code starts here ###

    userStr = str(input('(Type in value for userStr and press Enter): '))
    userChr = str(input('(Type in value for userChr and press Enter): '))
    found = False
    repeat = True
    currentIndex = 0
    while repeat:
        if charat(userStr, currentIndex) == userChr:
            found = True
            repeat = False
        else:
            currentIndex = currentIndex + 1
            if currentIndex == len(userStr):
                repeat = False
    if found:
        display("Found ", userChr, " at position ", currentIndex)
    else:
        display("Did not find", userChr)
    """

    write_code_to_file(code, "ex1copy.py")

    python_file_path = "ex1copy.py"

    execution_time, memory_usage = measure_execution_time_and_memory(python_file_path)

    print(f"Execution Time: {execution_time} seconds")
    print(f"Memory Usage: {memory_usage} MB")
      </py-script>
    </div>
  )
}

export default Login
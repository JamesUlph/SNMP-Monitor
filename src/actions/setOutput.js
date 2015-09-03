function setOutput(input, state) {
    console.log(input.value);
    state.set(
        'snmpdata',input.value
    );
}

export default setOutput;

<template>
    <section class="flex w-full">
        <div class="m-auto ">
            <h1 class="text-2xl text-center my-5">Calculator</h1>
            <div class="cal border rounded p-3 mt-4">

                <p class="text-3xl text-right mx-auto mt-10 mb-2 h-20 w-40 overflow-x-scroll overflow-y-hidden"
                    style="direction:rtl">{{ currentNum }}</p>
                <div class="h-5 mb-2">
                    <small v-if="selectedOperation">{{ prevNum }} {{ selectedOperation }} {{ currentNum }}</small>
                </div>
                <div class="grid grid-cols-4 gap-1">
                    <button @click="pressed(1)" class="p-2 w-10 border rounded shadow ">1</button>
                    <button @click="pressed(2)" class="p-2 w-10 border rounded shadow ">2</button>
                    <button @click="pressed(3)" class="p-2 w-10 border rounded shadow ">3</button>
                    <button @click="pressed('+')" class="p-2 w-10 border rounded shadow ">+</button>
                    <button @click="pressed(4)" class="p-2 w-10 border rounded shadow ">4</button>
                    <button @click="pressed(5)" class="p-2 w-10 border rounded shadow ">5</button>
                    <button @click="pressed(6)" class="p-2 w-10 border rounded shadow ">6</button>
                    <button @click="pressed('-')" class="p-2 w-10 border rounded shadow ">-</button>
                    <button @click="pressed(7)" class="p-2 w-10 border rounded shadow ">7</button>
                    <button @click="pressed(8)" class="p-2 w-10 border rounded shadow ">8</button>
                    <button @click="pressed(9)" class="p-2 w-10 border rounded shadow ">9</button>
                    <button @click="pressed('*')" class="p-2 w-10 border rounded shadow ">*</button>
                    <button @click="pressed('c')" class="p-2  border rounded shadow ">C</button>
                    <button @click="pressed(0)" class="p-2  border rounded shadow ">0</button>
                    <button @click="pressed('=')" class="p-2 w-10 border rounded shadow ">=</button>
                    <button @click="pressed('/')" class="p-2 w-10 border rounded shadow ">/</button>

                </div>
            </div>

        </div>
    </section>
</template>

<script>
import { ref } from 'vue'
import useWindowEvent from '../utilities/composition/useWindowEvent';
export default {
    setup() {
        const operation = ['+', '-', '*', '/'];
        const prevNum = ref("")
        const currentNum = ref("")
        const selectedOperation = ref("")

        function pressed(value) {
            if (value === "=" || value === "Enter") result();
            else if (value === "c") clear();
            else if (operation.includes(value)) applyOperation(value);
            else if (isNaN(value)) { }
            else appendNum(value.toString())
        }
        function appendNum(value) {
            currentNum.value = currentNum.value + value
        }
        function applyOperation(value) {
            result()
            prevNum.value = currentNum.value;
            currentNum.value = "";
            selectedOperation.value = value

        }
        function result() {
            if (selectedOperation.value === "+") sum();
            else if (selectedOperation.value === "-") subtract();
            else if (selectedOperation.value === "*") multiply();
            else if (selectedOperation.value === "/") divide();
            prevNum.value = "";
            selectedOperation.value = "";
        }
        function sum() {
            currentNum.value = +prevNum.value + +currentNum.value
        }
        function subtract() {
            currentNum.value = prevNum.value - currentNum.value
        }
        function multiply() {
            currentNum.value = prevNum.value * currentNum.value
        }
        function divide() {
            currentNum.value = prevNum.value / currentNum.value
        }

        function clear() {
            currentNum.value = "";
            prevNum.value = "";
            selectedOperation.value = "";
        }

        const handleEvent = (e) => pressed(e.key);
        
        useWindowEvent("keydown",handleEvent)

       
        return { currentNum, prevNum, pressed, selectedOperation }
    },
}
</script>

<style>
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.cal {
    transform: scale(1.5);
    margin-top: 100%;
}
</style>
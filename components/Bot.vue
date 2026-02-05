<template>
  <div class="fluid-container" @click="handleContainerClick">
    <div v-if="showInteractionWindow">
      <div class="interaction-window">
        <div class="questions">
          <div v-for="(dialogue, index) in dialogues" :key="index">
            <p @click="selectOption(dialogue, 0)">{{ dialogue.question }}</p>
          </div>
        </div>

        <div class="answers">
          <p v-if="selectedOption && selectedOption.answer"></p>
          <div v-if="selectedOption && selectedOption.followUp">
            <div v-for="(subDialogue, subIndex) in selectedOption.followUp" :key="subIndex">
              <p  class="follow-up-question" @click="selectOption(subDialogue, subIndex)">{{ subDialogue.question }}</p>
            </div>
          </div>
        </div>
        
        <div class="conversation-history">
          <h3>Conversation History:</h3>
          <ul>
            <li v-for="(entry, index) in conversationHistory" :key="index">
              <strong>{{ entry.question }}</strong>: {{ entry.answer }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="fluid-shape layer-1"></div>
    <div class="fluid-shape layer-2"></div>
    <div class="fluid-shape layer-3"></div>
    <div class="eyes" :class="eyeState">
      <div class="eye left-eye"></div>
      <div class="eye right-eye"></div>
    </div>
    <div v-if="isSleeping" class="zzzz">
      <span v-for="(letter, index) in zzzLetters" :key="index" class="zzz" :style="getStyle(index)">
          {{ letter }}
      </span>
    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      layer1: null,
      layer2: null,
      layer3: null,
      isSleeping: true,
      eyeState: 'eye-sleepy',
      zzzLetters: ['Z', 'Z', 'Z', 'Z'],
      showInteractionWindow: false,
      selectedOption: null,
      isAwake: false,
      conversationHistory: [],
      dialogues: [
        {
          question: "Who am I?",
          answer: "I am your assistant!",
          followUp: [
            {
              question: "What can you do?",
              answer: "I can help you with various tasks.",
              followUp: [
                {
                  question: "Can you talk to me?",
                  answer: "Yes, we can have a conversation anytime!"
                },
                {
                  question: "Can you play games?",
                  answer: "Not yet, but I might in the future!"
                }
              ]
            }
          ]
        },
        {
          question: "What is this site?",
          answer: "This is a website for interacting with me.",
        },
        {
          question: "Let's talk!",
          answer: "Sure! I'm here to chat.",
          followUp: [
            {
              question: "What can you do?",
              answer: "Nothing for now.",
              followUp: [
                {
                  question: "Can you talk to me?",
                  answer: "Yes, we can have a conversation anytime!"
                },
                {
                  question: "Cos takiego tez moge?",
                  answer: "Na razie nie!"
                },
                {
                  question: "Can you play games?",
                  answer: "Not yet, but I might in the future!"
                }
              ]
            }
          ]
        }
      ],
    };
  },
  mounted() {
    this.layer1 = document.querySelector('.layer-1');
    this.layer2 = document.querySelector('.layer-2');
    this.layer3 = document.querySelector('.layer-3');
    this.startFluidAnimation();
  },
  methods: {
    startFluidAnimation() {
      const animations = [this.animateLayer1, this.animateLayer2, this.animateLayer3];
      let currentAnimation = 0;

      function animate() {
        animations[currentAnimation]();
        currentAnimation = (currentAnimation + 1) % animations.length;
        requestAnimationFrame(animate);
      }

      animate();
    },
    animateLayer1() {
      if (!this.layer1) return;

      const now = performance.now() / 1000;
      const scale = 1 + 0.05 * (Math.sin(now) + 1);
      const rotation = (now * 30) % 360;
      const borderRadius = `${30 + 10 * Math.sin(now)}%`;

      this.layer1.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      this.layer1.style.borderRadius = borderRadius;
    },
    animateLayer2() {
      if (!this.layer2) return;

      const now = performance.now() / 2000;
      const scale = 1 + 0.05 * (Math.cos(now + 0.3) + 1);
      const rotation = (now * -20) % 360;
      const borderRadius = `${35 + 10 * Math.cos(now + 0.3)}%`;

      this.layer2.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      this.layer2.style.borderRadius = borderRadius;
    },
    animateLayer3() {
      if (!this.layer3) return;

      const now = performance.now() / 3000;
      const scale = 1 + 0.015 * (Math.sin(now + 0.6) + 1);
      const rotation = (now * 15) % 360;
      const borderRadius = `${40 + 5 * Math.cos(now + 0.6)}%`;

      this.layer3.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      this.layer3.style.borderRadius = borderRadius;
    },
    handleContainerClick() {
      if (this.isAwake) {
        this.showInteractionWindow = !this.showInteractionWindow; 
      } else {
        this.wakeUp();
      }
    },
    wakeUp() {
      this.isSleeping = false;
      this.eyeState = 'eye-normal';
      this.isAwake = true;
      this.showInteractionWindow = true;
    },
    selectOption(dialogue, subIndex = 0) {
  this.conversationHistory.push({
    question: dialogue.question,
    answer: dialogue.answer
  });

  if (dialogue.followUp && dialogue.followUp.length > 0) {
    this.selectedOption = dialogue;
  } else {
    this.selectedOption = null;
  }

  this.showInteractionWindow = false;
},

    getStyle(index) {
      return {
        animationDelay: `${index * 0.3}s`,
      };
    }
  },
};
</script>

<style scoped>
.fluid-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 120px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
}

.fluid-shape {
  width: 80px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 30% 70% 62% 38% / 28% 42% 58% 72%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  position: absolute;
}

.layer-1 {
  background: linear-gradient(140deg, #6b2c72, #44195e);
}

.layer-2 {
  background: linear-gradient(140deg, #7f399d, #522272);
}

.layer-3 {
  background: linear-gradient(140deg, #a755b0, #69247a);
}

.eyes {
  display: flex;
  justify-content: space-between;
  width: 40px;
  position: relative;
}

.eye {
  width: 10px;
  height: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.eye-sleepy .left-eye, .eye-sleepy .right-eye {
  clip-path: ellipse(70% 20% at 50% 50%);
  background-color: #bbb; 
}

.eye-normal .left-eye, .eye-normal .right-eye {
  clip-path: ellipse(50% 50% at 50% 79%);
  margin-bottom: 10px;
  animation: blink 3s infinite;
}


.zzz {
  position: absolute;
  left: 20px;
  top: 20px;
  opacity: 0;
  animation: zzzAnimation 2s ease-in infinite;
}

@keyframes blink {
  0%, 100% {
    clip-path: ellipse(50% at 50% 79%);
  }

  50% {
    clip-path: ellipse(50% 10% at 50% 85%);
  }

}

@keyframes zzzAnimation {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  99% {
    transform: translate(-10px, -20px);
    opacity: 1;
  }
  100% {
    transform: translate(-15px, -40px);
    opacity: 0;
  }
}

.interaction-window {
  position: absolute;
  bottom: 200px;
  overflow-y: auto;
  left: 100px;
  width: 300px;
  height: 500px;
  padding: 20px;
  background-color: #3e05558c;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  animation: fadeIn 1s;
}

.follow-up-question {
  margin-left: 20px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.dialog p {
  margin: 10px 0;
  cursor: pointer;
}

.dialog {
  display: flex;
  flex-direction: column-reverse;
}
</style>

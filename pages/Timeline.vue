<template>
  <div class="timeline">
    <div class="month-container">
      <div v-for="(month, index) in months" :key="index" class="month">
        <div class="month-name">{{ getMonthName(month) }}</div>
        <div class="month-days">
          <div v-for="(day, index) in generateDaysInMonth(month)" :key="index" class="day">
            {{ day }}
          </div>
        </div>
      </div>
    </div>
    <div class="events">
      <div v-for="(event, index) in events" :key="index" class="event"
           :style="getEventStyle(event, index)" @click="openEvent(event)">
        <div class="event-name">{{ event.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [
        { title: 'Event 1', startDate: '2026-03-01', endDate: '2025-03-08' },
        { title: 'Event 2', startDate: '2026-01-12', endDate: '2025-03-15' },
        { title: 'Event 3', startDate: '2026-06-11', endDate: '2025-09-17' },
      ],
      months: [],
    };
  },
  methods: {
    generateDaysInMonth(month) {
      const daysInMonth = [];
      const currentDate = new Date();
      currentDate.setMonth(month);
      const daysInCurrentMonth = new Date(currentDate.getFullYear(), month + 1, 0).getDate();

      for (let i = 1; i <= daysInCurrentMonth; i++) {
        daysInMonth.push(i);
      }
      return daysInMonth;
    },

    getMonthName(month) {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return months[month];
    },

    getEventStyle(event, index) {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    const eventStartDay = startDate.getDate();
    const eventStartMonth = startDate.getMonth();
    const eventEndDay = endDate.getDate();
    const eventEndMonth = endDate.getMonth();

    let left = 0;
    let width = 0;
    let top = 0;

    if (eventStartMonth === this.months[0]) {
        left = (eventStartDay - 1) * 30;
        if (eventEndMonth === this.months[0]) {
            width = (eventEndDay - eventStartDay + 1) * 30;
        } else if (eventEndMonth === this.months[1]) {
            width = (this.generateDaysInMonth(this.months[0]).length - eventStartDay + 1) * 30 + (eventEndDay * 30);
        } else if (eventEndMonth === this.months[2]) {
            width = (this.generateDaysInMonth(this.months[0]).length - eventStartDay + 1) * 30 + (this.generateDaysInMonth(this.months[1]).length * 30) + (eventEndDay * 30);
        }
    }
    else if (eventStartMonth === this.months[1]) {
        left = (this.generateDaysInMonth(this.months[0]).length * 30) + (eventStartDay - 1) * 30;
        if (eventEndMonth === this.months[1]) {
            width = (eventEndDay - eventStartDay + 1) * 30;
        } else if (eventEndMonth === this.months[2]) {
            width = (this.generateDaysInMonth(this.months[1]).length - eventStartDay + 1) * 30 + (eventEndDay * 30);
        }
    }
    else if (eventStartMonth === this.months[2]) {
        left = (this.generateDaysInMonth(this.months[0]).length * 30) + (this.generateDaysInMonth(this.months[1]).length * 30) + (eventStartDay - 1) * 30;
        width = (eventEndDay - eventStartDay + 1) * 30;
    }

    let eventTopOffset = 0;
    const eventsAtSamePeriod = this.events.filter((e, eIndex) => {
        if (eIndex === index) return false;

        const eStart = new Date(e.startDate);
        const eEnd = new Date(e.endDate);
        const isOverlapping =
            (eStart <= endDate && eEnd >= startDate);

        return isOverlapping;
    });

    if (eventsAtSamePeriod.length > 0) {
        let overlappingEventIndex = 0;

        eventsAtSamePeriod.forEach((e) => {
            const eStart = new Date(e.startDate);
            const eEnd = new Date(e.endDate);
            if (eStart < startDate && eEnd > endDate) {
                overlappingEventIndex += 1;
            }
        });

        eventTopOffset = overlappingEventIndex * 50;
    }

    return {
        left: `${left}px`,
        top: `${eventTopOffset}px`,
        width: `${width}px`,
        position: 'absolute',
        backgroundColor: '#8a2be2',
        padding: '5px',
        borderRadius: '5px',
        textAlign: 'center',
        color: 'white',
        fontSize: '12px',
    };
},



    openEvent(event) {
      alert(`Wydarzenie: ${event.title}`);
    },

    generateMonths() {
      const currentMonth = new Date().getMonth();
      this.months = [
        currentMonth,
        (currentMonth + 1) % 12,
        (currentMonth + 2) % 12,
      ];
    }
  },
  mounted() {
    this.generateMonths();
  },
};
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  background-color: #31144d;
  padding: 20px;
}

.month-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.month {
  display: flex;
  flex-direction: column;
  min-width: fit-content;
}

.month-name {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.month-days {
  display: flex;
  justify-content: flex-start;
}

.day {
  width: 30px;
  text-align: center;
  margin-bottom: 5px;
}

.events {
  position: relative;
  width: 100%;
  height: 200px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.267) 1px, transparent 1px);
    background-size: 30px;
}

.event {
  position: absolute;
  background-color: #8a2be2;
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;
}

.event-name {
  font-size: 14px;
}
</style>

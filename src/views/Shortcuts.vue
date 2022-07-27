<template>
  <div
    class="
      uk-grid-column-small
      uk-grid-row-small
      uk-preserve-height
      uk-preserve-width
      uk-child-width-1-4@s
      uk-padding-small
    "
    uk-grid
  >
    <router-link
      :to="shortcut.action"
      v-for="(shortcut, index) in getShortcuts"
      :key="index"
    >
      <button
        class="
          uk-button uk-button-large uk-button-default uk-width-1-1
          button-tile
        "
        @click="runCommand(index)"
      >
        <i
          class="uk-icon"
          :uk-icon="'icon: ' + shortcut.icon + '; ratio: 2.5'"
        ></i>
        <div>
          <span class="uk-inline tile-text">{{ shortcut.title }}</span>

          <span
            class="
              uk-icon
              uk-align-right
              uk-position-relative
              uk-margin-remove-bottom
              uk-margin-small-right
            "
            style="color: grey"
            uk-icon="icon: pencil; ratio: 0.75"
            @click="editShortcut(index)"
            uk-toggle="target: #modal-edit-shortcut"
          ></span>
        </div>
      </button>
    </router-link>
    <!-- Modal -->
    <div id="modal-edit-shortcut" uk-modal>
      <div class="uk-modal-dialog">
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Edit Shortcut</h2>
        </div>
        <div class="uk-modal-body">
          <form class="uk-form-horizontal uk-margin-small">
            <div class="uk-margin uk-flex">
              <label
                class="uk-text uk-margin-auto-vertical uk-margin-right"
                for="form-time"
                >Title</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input uk-form-width-small"
                  id="form-time"
                  type="text"
                  placeholder=""
                  v-model="currentShortcut.title"
                />
              </div>
            </div>

            <div class="uk-margin uk-flex">
              <label
                class="uk-text uk-margin-auto-vertical uk-margin-right"
                for="form-time"
                >Icon</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input uk-form-width-small"
                  id="form-time"
                  type="text"
                  placeholder=""
                  v-model="currentShortcut.icon"
                />
              </div>
              <span
                class="uk-icon uk-margin-left uk-margin-small-top"
                :uk-icon="'icon: ' + currentShortcut.icon + '; ratio: 1.5'"
              >
              </span>
            </div>

            <div class="uk-margin uk-flex">
              <label
                class="uk-text uk-margin-auto-vertical uk-margin-right"
                for="form-time"
                >Route</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input uk-form-width-small"
                  id="form-time"
                  type="text"
                  placeholder=""
                  v-model="currentShortcut.action"
                />
              </div>
            </div>
            <div class="uk-margin uk-flex">
              <label
                class="uk-text uk-margin-auto-vertical uk-margin-right"
                for="form-time"
                >Shell Command</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input uk-form-width-small"
                  id="form-time"
                  type="text"
                  placeholder=""
                  v-model="currentShortcut.shell"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button
            class="uk-button uk-button-primary uk-modal-close"
            type="button"
            @click="finishedEditShortcut"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { computed } from "@vue/reactivity";
  import { mapGetters, mapMutations } from "vuex";
  const { ipcRenderer } = window.require("electron");

  export default {
    name: "Shortcuts",

    computed: {
      ...mapGetters({
        getShortcuts: "shortcuts/getShortcuts"
      })
    },
    methods: {
      runCommand(index) {
        let commands = this.getShortcuts[index].shell.split(" ");
        let process = commands.shift();

        if (commands.length > 0) {
          ipcRenderer.send("run-shell", process, commands);
        } else if (process) {
          ipcRenderer.send("run-shell", process);
        }
      },
      editShortcut(index) {
        console.log("edit shortcut " + index);
        this.currentIndex = index;
        this.currentShortcut = this.getShortcuts[index];
      },
      finishedEditShortcut() {
        this.modifyShortcut({
          index: this.currentIndex,
          shortcut: this.currentShortcut
        });
      },
      ...mapMutations({
        modifyShortcut: "shortcuts/modifyShortcut"
      })
    },
    data() {
      return {
        currentIndex: 0,
        currentShortcut: {}
      };
    }
  };
</script>

<style>
  .button-tile {
    font-size: min(calc(5vh - 9px), 14px);
    height: calc(33vh - 54px);
    padding: 0%;
    border-radius: 8px;
  }

  .center-icon {
    font-size: 4em;
    padding: calc(0);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tile-text {
    font-size: 1em;
    padding-top: 2vh;
    line-height: 120%;
    display: flex;
    justify-content: center;
  }
</style>

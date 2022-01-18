<template>
        <div class="uk-grid-column-small uk-grid-row-small uk-preserve-height uk-preserve-width uk-child-width-1-4@s uk-padding-small" uk-grid>
            
            <router-link to="/">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile">
                    <i class="fa fa-home center-icon"></i>
                    <span class="tile-text">Home</span>
                </button>
            </router-link>

            <router-link to="/settings">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile">
                        <i class="fa fa-gear center-icon"></i>
                        <span class="tile-text">Settings</span>
                </button>
            </router-link>
            
            <router-link to="/profile">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile">
                        <i class="fa fa-line-chart center-icon"></i>
                        <span class="tile-text">Adjust Profile</span>
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                        <i class="fa fa-times center-icon"></i>
                        <span class="tile-text">Free Button</span>
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                        <i class="fa fa-times center-icon"></i>
                        <span class="tile-text">Free Button</span>
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                        <i class="fa fa-times center-icon"></i>
                        <span class="tile-text">Free Button</span>
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                        <i class="fa fa-times center-icon"></i>
                        <span class="tile-text">Free Button</span>
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                        <i class="fa fa-times center-icon"></i>
                        <span class="tile-text">Free Button</span>
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                        <i class="fa fa-times center-icon"></i>
                        <span class="tile-text">Free Button</span>
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                        <i class="fa fa-times center-icon"></i>
                        <span class="tile-text">Free Button</span>
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                        <i class="fa fa-times center-icon"></i>
                        <span class="tile-text">Free Button</span>
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                        <i class="fa fa-times center-icon"></i>
                        <span class="tile-text">Free Button</span>
                </button>
            </router-link>

        </div>
    <BottomBar></BottomBar>
</template>

<script>

export default {
name: "Shortcuts",

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
    align-items:center;
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

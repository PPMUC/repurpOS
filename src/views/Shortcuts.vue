<template>
        <div class="uk-grid-column-small uk-grid-row-small uk-preserve-height uk-preserve-width uk-child-width-1-4@s uk-padding-small" uk-grid>
            
            <router-link to="/">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile">
                    <div class="uk-grid-column-small uk-padding-remove uk-margin-remove" uk-grid>
                        <i class="fa fa-home center-icon"></i>
                        <span class="uk-text uk-width-2-3 uk-padding-remove">Home</span>
                    </div>
                </button>
            </router-link>

            <router-link to="/settings">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile">
                    <div class="uk-grid-column-small uk-padding-remove uk-margin-remove" uk-grid>
                        <i class="fa fa-gear center-icon"></i>
                        <span class="uk-text uk-width-2-3 uk-padding-remove">Settings</span>
                    </div>
                </button>
            </router-link>
            
            <router-link to="/profile">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile">
                    <div class="uk-grid-column-small uk-padding-remove uk-margin-remove" uk-grid>
                        <i class="fa fa-line-chart center-icon"></i>
                        <span class="uk-text uk-width-2-3 uk-padding-remove">Adjust Profile</span>
                    </div>
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                    Free Button
                </button>
            </router-link>
            
            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                    Free Button
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                    Free Button
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                    Free Button
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                    Free Button
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                    Free Button
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                    Free Button
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                    Free Button
                </button>
            </router-link>

            <router-link to="/shortcuts">
                <button class="uk-button uk-button-large uk-button-default uk-width-1-1 button-tile" disabled>
                    Free Button
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
    font-size: 1.2em; 
    height:130px;
    padding: 0%;
    border-radius: 8px;
}

.center-icon {
    font-size: 1.2em;
    display: flex;
    align-items:center;
}

</style>

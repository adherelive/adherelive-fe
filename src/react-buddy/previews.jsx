import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import NotificationDrawer from "../Components/Drawer/notification";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/NotificationDrawer">
                <NotificationDrawer/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
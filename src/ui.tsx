import {
    Banner,
    Columns,
    Container,
    IconCheckCircle32,
    IconWarning32,
    Muted,
    render,
    Text,
    TextboxColor,
    VerticalSpace
} from '@create-figma-plugin/ui'
import {h} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import chroma from "chroma-js";
import "./index.css";
import {isValidHexColor} from "@create-figma-plugin/utilities";

const DELTA_E_THRESHOLD = 35;

function Plugin() {
    const [hexColor1, setHexColor1] = useState("000000");
    const [hexColor2, setHexColor2] = useState("ffffff");
    const [opacityColor1, setOpacityColor1] = useState("100");
    const [opacityColor2, setOpacityColor2] = useState("100");
    const [deltaE, setDeltaE] = useState(0);

    useEffect(() => {
        if (isValidHexColor(hexColor1) && isValidHexColor(hexColor2)) {
            setDeltaE(calcDeltaE());
        }
    }, [hexColor1, hexColor2])

    function calcDeltaE() {
        return chroma.deltaE(hexColor1, hexColor2);
    }

    const isGoodDeltaE = deltaE >= DELTA_E_THRESHOLD;

    return (
        <Container space="medium">
            <VerticalSpace space="large"/>
            <Banner
                icon={isGoodDeltaE ? <IconCheckCircle32/> : <IconWarning32/>}
                variant={isGoodDeltaE ? "success" : "warning"}
            >
                Delta-E: {deltaE.toFixed(0)}
            </Banner>
            <VerticalSpace space="large"/>
            <Columns space={"medium"}>
                <div>
                    <Text>
                        <Muted>Color 1</Muted>
                    </Text>
                    <VerticalSpace space="small"/>
                    <TextboxColor
                        hexColor={hexColor1}
                        opacity={opacityColor1}
                        onHexColorValueInput={setHexColor1}
                        onHexColorInput={(event: any) => {
                            setHexColor1(event.target.value)
                        }}
                        onOpacityValueInput={setOpacityColor1}
                        variant={"border"}
                    />
                </div>
                <div>
                    <Text>
                        <Muted>Color 2</Muted>
                    </Text>
                    <VerticalSpace space="small"/>
                    <TextboxColor
                        hexColor={hexColor2}
                        opacity={opacityColor2}
                        onHexColorValueInput={setHexColor2}
                        onHexColorInput={(event: any) => {
                            setHexColor2(event.target.value)
                        }}
                        onOpacityValueInput={setOpacityColor2}
                        variant={"border"}
                    />
                </div>
            </Columns>
        </Container>
    )
}

export default render(Plugin)
